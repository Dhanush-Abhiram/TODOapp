# Import necessary modules
from django.urls import path
from .views import todayTasks, addTask, updateTask

# Define URL patterns
urlpatterns = [
    # Endpoint for retrieving tasks created today
    path('task_today/', todayTasks),
    # Endpoint for adding a new task
    path('add_task/', addTask),
    # Endpoint for updating or deleting a task by its primary key
    path('update_task/<int:pk>/', updateTask)
]
