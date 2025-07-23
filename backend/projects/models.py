from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation

User = get_user_model()


class Project(models.Model):
    STATUS_CHOICES = [
        ('in_dev', 'In Development'),
        ('ready', 'Ready to Use'),
        ('shipped', 'Shipped'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=255)
    tool_app_name = models.CharField(max_length=100)
    description = models.TextField()
    
    github_repo = models.URLField(blank=True)
    demo_link = models.URLField(blank=True)
    tutorial_link = models.URLField(blank=True)
    technologies = models.CharField(max_length=500, help_text="Comma-separated technologies")
    hours_worked = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_dev')
    
    image = models.ImageField(upload_to='project_images/', blank=True, null=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    upvotes = GenericRelation('wishes.Upvote')
    boosts = GenericRelation('boosts.Boost')
    comments = GenericRelation('comments.Comment')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} by {self.user.username}"

    @property
    def upvotes_count(self):
        return self.upvotes.count()

    @property
    def total_funding(self):
        return self.boosts.aggregate(
            total=models.Sum('amount')
        )['total'] or 0


class ProjectUpdate(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='updates')
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Update: {self.title}" 