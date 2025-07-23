from rest_framework import serializers
from .models import Boost
from users.serializers import UserSerializer

class BoostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    target_title = serializers.CharField(read_only=True)
    
    class Meta:
        model = Boost
        fields = [
            'id', 'user', 'amount', 'message', 'target_title',
            'content_type', 'object_id', 'created_at'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'target_title']