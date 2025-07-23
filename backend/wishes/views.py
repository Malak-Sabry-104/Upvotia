
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import models
from django.contrib.contenttypes.models import ContentType

from .models import Wish, Upvote
from .serializers import WishSerializer, UpvoteSerializer


class WishViewSet(viewsets.ModelViewSet):
    queryset = Wish.objects.all().select_related('user')
    serializer_class = WishSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Wish.objects.all().select_related('user')
        
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        tool = self.request.query_params.get('tool')
        if tool and tool != 'All Tools':
            queryset = queryset.filter(tool_app_name=tool)
        
        category = self.request.query_params.get('category')
        if category and category != 'All Categories':
            queryset = queryset.filter(categories__icontains=category)
        
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(title__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(tool_app_name__icontains=search) |
                models.Q(categories__icontains=search)
            )
        
        # Sort
        sort = self.request.query_params.get('sort', 'Top Boosted')
        if sort == 'Newest':
            queryset = queryset.order_by('-created_at')
        elif sort == 'Most Funded':
            queryset = queryset.order_by('-pledge_amount')
        else:
            queryset = queryset.order_by('-created_at')
        
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        wish = self.get_object()
        content_type = ContentType.objects.get_for_model(wish)
        upvote, created = Upvote.objects.get_or_create(
            user=request.user, 
            content_type=content_type,
            object_id=wish.id
        )
        if not created:
            upvote.delete()
            return Response({'detail': 'Upvote removed.'}, status=status.HTTP_204_NO_CONTENT)
        serializer = UpvoteSerializer(upvote)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UpvoteViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = UpvoteSerializer
    queryset = Upvote.objects.all().select_related('user', 'content_object')
   
    def get_queryset(self):
        queryset = Upvote.objects.all().select_related('user')
        
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        return queryset