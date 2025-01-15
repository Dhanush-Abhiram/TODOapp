# Import necessary modules
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from database.models import Todo
from datetime import date, datetime
from django.db.models import Q
from database.serializers import TodoSerializer

# Define API endpoints and corresponding functions
@api_view(['GET'])
def todayTasks(request):
    # Get today's date
    today_date = date.today()
    # Define start and end of the day
    start_of_day = datetime.combine(today_date, datetime.min.time())
    end_of_day = datetime.combine(today_date, datetime.max.time())
    # Filter tasks created today and not done
    todayTasks = Todo.objects.filter(
        Q(dateTimeCreated__gte=start_of_day) & Q(dateTimeCreated__lte=end_of_day) & Q(taskDone=False)
    )
    # Serialize the queryset
    todayTasksSerializer = TodoSerializer(todayTasks, many=True)
    # Construct response data
    data = {ele['id']: ele for ele in todayTasksSerializer.data}
    # Return response
    return Response(data)

@api_view(['POST'])
def addTask(request):
    # Serialize request data
    serializer_data = TodoSerializer(data=request.data)
    # Check if data is valid
    if serializer_data.is_valid():
        # Save valid data
        serializer_data.save()
        return Response({'Sucess': 200})
    # Return error response if data is not valid
    return Response({'error': serializer_data.errors})

@api_view(['PUT', 'DELETE'])
def updateTask(request, pk):
    try:
        # Get todo item by primary key
        todoItem = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        # Return error if item does not exist
        return Response({'error': 400})
    if request.method == 'PUT':
        # Update todo item if request method is PUT
        serializer = TodoSerializer(instance=todoItem, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'Success': 'ok'})
    if request.method == 'DELETE':
        # Delete todo item if request method is DELETE
        todoItem.delete()
        return Response({'Success': 'ok'})
    # Return error for unsupported request method
    return Response({'error': 401})
