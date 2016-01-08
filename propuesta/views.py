from django.shortcuts import render

# Create your views here.

def propuesta(request):
    return render(request,'propuesta/index.html')