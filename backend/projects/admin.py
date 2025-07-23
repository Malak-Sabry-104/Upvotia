from django.contrib import admin
from .models import Project, ProjectUpdate


class ProjectUpdateInline(admin.TabularInline):
    model = ProjectUpdate
    extra = 0
    readonly_fields = ('created_at',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'tool_app_name', 'status', 'upvotes_count', 'created_at')
    list_filter = ('status', 'tool_app_name', 'created_at')
    search_fields = ('title', 'description', 'user__username', 'tool_app_name')
    readonly_fields = ('created_at', 'updated_at', 'upvotes_count')
    inlines = [ProjectUpdateInline]


@admin.register(ProjectUpdate)
class ProjectUpdateAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('title', 'description', 'project__title')
    readonly_fields = ('created_at',)