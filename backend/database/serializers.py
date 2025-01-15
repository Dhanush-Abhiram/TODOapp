# Import serializers from the rest_framework module
from rest_framework import serializers
# Import the Todo model
from .models import Todo

# Define the serializer for the Todo model
class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo  # Specify the model to serialize
        fields = ['id', 'task', 'taskDescription', 'scheaduleDateTime', 'taskDone', 'taskPriority']  # Define fields to include in the serialized representation

    # Override the update method to update the Todo instance
    def update(self, instance, validated_data):
        # Update task fields with validated data
        instance.task = validated_data.get('task', instance.task)
        instance.taskDescription = validated_data.get('taskDescription', instance.taskDescription)
        instance.scheaduleDateTime = validated_data.get('scheaduleDateTime', instance.scheaduleDateTime)
        instance.taskDone = validated_data.get('taskDone', instance.taskDone)
        instance.taskPriority = validated_data.get('taskPriority', instance.taskPriority)
        instance.save()  # Save the updated instance
        return instance  # Return the updated instance

