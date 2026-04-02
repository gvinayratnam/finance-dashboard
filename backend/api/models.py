from django.db import models

class Transactions(models.Model):
    TYPE_CHOICES = (
        ('income','Income'),
        ('expense','Expense')
    )

    CATEGORY_CHOICES = [
    ('Shopping', 'Shopping'),
    ('Food', 'Food'),
    ('Utilities', 'Utilities'),
    ('Entertainment', 'Entertainment'),
    ('Healthcare', 'Healthcare'),
    ('Transport', 'Transport'),
    ('Salary', 'Salary'),
    ('Freelance', 'Freelance'),
    ('Investment', 'Investment'),
]

    title = models.CharField(max_length=100)
    amount = models.FloatField()
    category = models.CharField( max_length=50, choices=CATEGORY_CHOICES)
    type = models.CharField( max_length=10,choices=TYPE_CHOICES)
    date = models.DateField()

    def __str__(self):
        return self.title
    
