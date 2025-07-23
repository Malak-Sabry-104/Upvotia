from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Project, ProjectUpdate
from .serializers import ProjectSerializer, ProjectUpdateSerializer
from django.db import models


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().select_related('user')
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Project.objects.all().select_related('user')
        
        # Filter by user
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        # Filter by tool/app
        tool = self.request.query_params.get('tool')
        if tool and tool != 'All Tools':
            queryset = queryset.filter(tool_app_name=tool)
        
        # Filter by status
        status = self.request.query_params.get('status')
        if status:
            queryset = queryset.filter(status=status)
        
        # Search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(tool_app_name__icontains=search)
            )
        
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def add_update(self, request, pk=None):
        project = self.get_object()
        
        if project.user != request.user:
            return Response(
                {'detail': 'Only project owner can add updates.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = ProjectUpdateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(project=project)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        project = self.get_object()
        from django.contrib.contenttypes.models import ContentType
        from wishes.models import Upvote
        
        content_type = ContentType.objects.get_for_model(project)
        upvote, created = Upvote.objects.get_or_create(
            user=request.user, 
            content_type=content_type,
            object_id=project.id
        )
        if not created:
            upvote.delete()
            return Response({'detail': 'Upvote removed.'}, status=status.HTTP_204_NO_CONTENT)
        
        from wishes.serializers import UpvoteSerializer
        serializer = UpvoteSerializer(upvote)
        return Response(serializer.data, status=status.HTTP_201_CREATED)