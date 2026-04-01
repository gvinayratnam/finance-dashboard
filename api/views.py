from django.shortcuts import render
from .models import Transactions
from rest_framework import viewsets
from .serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transactions.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
