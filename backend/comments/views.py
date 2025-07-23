from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().select_related('user')
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = Comment.objects.all().select_related('user')
        
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        content_type_id = self.request.query_params.get('content_type')
        object_id = self.request.query_params.get('object_id')
        
        if content_type_id and object_id:
            queryset = queryset.filter(
                content_type_id=content_type_id,
                object_id=object_id,
                parent=None
            )
        
        return queryset


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_comment(request):
    data = request.data.copy()
    
    app_label = data.get('app_label')
    model_name = data.get('model_name')
    object_id = data.get('object_id')
    
    try:
        content_type = ContentType.objects.get(app_label=app_label, model=model_name)
        content_object = content_type.get_object_for_this_type(id=object_id)
    except (ContentType.DoesNotExist, content_type.model_class().DoesNotExist):
        return Response(
            {'error': 'Invalid target object'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    comment_data = {
        'content': data.get('content'),
        'parent': data.get('parent'),
        'content_type': content_type.id,
        'object_id': object_id,
    }
    
    serializer = CommentSerializer(data=comment_data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)