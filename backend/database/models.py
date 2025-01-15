from django.db import models
from datetime import datetime

# Define the Todo model
class Todo(models.Model):
    # Define fields for the Todo model
    task = models.CharField(max_length=200)  # Task name
    taskDescription = models.CharField(default='', max_length=5000, blank=True)  # Task description
    dateTimeCreated = models.DateTimeField()  # Date and time when the task was created
    scheaduleDateTime = models.DateTimeField()  # Scheduled date and time for the task
    taskDone = models.BooleanField(default=False)  # Flag to indicate if the task is completed
    taskPriority = models.IntegerField(choices=[(1, 'Low'), (2, 'Normal'), (3, 'High')])  # Priority of the task

    # Override the save method to set the dateTimeCreated field if not provided
    def save(self, *args, **kwargs):
        if not self.dateTimeCreated:
            self.dateTimeCreated = datetime.now()
        super().save(*args, **kwargs)