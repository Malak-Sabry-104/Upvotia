from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericRelation
from django.contrib.contenttypes.fields import GenericForeignKey

User = get_user_model()


class Wish(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishes')
    title = models.CharField(max_length=255)
    tool_app_name = models.CharField(max_length=100, blank=True, help_text="e.g., Notion, Slack")
    description = models.TextField(blank=True)
    categories = models.CharField(max_length=500, blank=True, help_text="Comma-separated categories")
    pledge_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    image = models.ImageField(upload_to='wish_images', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    upvotes = GenericRelation('wishes.Upvote')
    boosts = GenericRelation('boosts.Boost')
    comments = GenericRelation('comments.Comment')

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    @property
    def upvotes_count(self):
        return self.upvotes.count()

    @property
    def categories_list(self):
        if self.categories:
            return [cat.strip() for cat in self.categories.split(',')]
        return []

    @property
    def total_funding(self):
        return self.boosts.aggregate(
            total=models.Sum('amount')
        )['total'] or 0


class Upvote(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wish_upvotes')
    content_type = models.ForeignKey('contenttypes.ContentType', on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user} upvoted {self.content_object}"