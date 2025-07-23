from rest_framework import serializers
from .models import Wish, Upvote
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
        ]


class WishSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    upvotes_count = serializers.IntegerField(source='upvotes.count', read_only=True)
    categories_list = serializers.ListField(read_only=True)
    total_funding = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Wish
        fields = [
            'id',
            'user',
            'title',
            'tool_app_name',
            'description',
            'categories',
            'categories_list',
            'pledge_amount',
            'image',
            'created_at',
            'upvotes_count',
            'total_funding',
        ]
        read_only_fields = ['id', 'user', 'created_at', 'upvotes_count', 'total_funding', 'categories_list']


class UpvoteSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    target_title = serializers.SerializerMethodField()

    class Meta:
        model = Upvote
        fields = [
            'id',
            'user',
            'content_type',
            'object_id',
            'target_title',
            'created_at',
        ]
        read_only_fields = ['id', 'user', 'created_at', 'target_title']

    def get_target_title(self, obj):
        if hasattr(obj.content_object, 'title'):
            return obj.content_object.title
        return str(obj.content_object)