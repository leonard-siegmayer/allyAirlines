from django.db import models


class ContactMessage(models.Model):
    email = models.EmailField()
    body = models.CharField(max_length=1000)
    subject = models.CharField(max_length=100)

    def __str__(self):
        return self.subject
