from rest_framework import serializers
from .models import Project, ProjectUpdate
from users.serializers import UserSerializer

class ProjectUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectUpdate
        fields = ['id', 'title', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']

class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    upvotes_count = serializers.IntegerField(read_only=True)
    total_funding = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    updates = ProjectUpdateSerializer(many=True, read_only=True)
    technologies_list = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = [
            'id', 'user', 'title', 'tool_app_name', 'description',
            'github_repo', 'demo_link', 'tutorial_link', 'technologies',
            'technologies_list', 'hours_worked', 'status', 'image',
            'upvotes_count', 'total_funding', 'created_at', 'updated_at', 'updates'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'upvotes_count', 'total_funding']

    def get_technologies_list(self, obj):
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',')]
        return []