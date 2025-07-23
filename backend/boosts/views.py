from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.contenttypes.models import ContentType
from .models import Boost
from .serializers import BoostSerializer

class BoostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Boost.objects.all().select_related('user')
    serializer_class = BoostSerializer
   
    def get_queryset(self):
        queryset = Boost.objects.all().select_related('user')
        
        user_id = self.request.query_params.get('user')
        if user_id:
            queryset = queryset.filter(user_id=user_id)
        
        return queryset


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_boost(request):
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
    
    boost_data = {
        'amount': data.get('amount'),
        'message': data.get('message', ''),
        'content_type': content_type.id,
        'object_id': object_id,
    }
    
    serializer = BoostSerializer(data=boost_data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)