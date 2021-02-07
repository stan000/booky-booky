# Still working on this
from datetime import datetime

serving_number = 0
your_number = 0

def print_recipt():
  recipt = '''Your number is {}
  time of request is {}
  '''.format(your_number, datetime.now())
  print(recipt)

def get_number(current):
  your_number = current + 1
  print_recipt()
  return your_number

def serve_next(current):
  serving_number = current + 1
  return serving_number

def reset():
  serving_number = 0
  your_number = 0
  return 0, 0

print('Serving: {}\n'.format(serving_number))
serving_number = serve_next(serving_number)
print('Serving: {}\n'.format(serving_number))
your_number = get_number(your_number)
# print('Serving: {}\nYour number: {}\n'.format(serving_number, your_number))
your_number = get_number(your_number)
# print('Serving: {}\nYour number: {}\n'.format(serving_number, your_number))
your_number, serving_number = reset()
# print('Serving: {}\nYour number: {}\n'.format(serving_number, your_number))

