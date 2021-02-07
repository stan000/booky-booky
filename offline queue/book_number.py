from docxtpl import DocxTemplate
import datetime 

your_number = 0
bank_name = 'StanBank'

current_time = datetime.datetime.now()
formated_time = str(current_time.hour) + ':' + str(current_time.minute) + ':' + str(current_time.second)

# Function recieves current available number
# then makes a new MS word doc recipt and updates values
def print_reciept(your_number):
  queue_number = your_number + 1
  doc = DocxTemplate('tempalate.docx')
  context = {
      'Bank' : bank_name,
      'Date' : datetime.date.today(),
      'queue' : queue_number,
      'Time' : formated_time,
        }

  doc.render(context)
  doc.save('recipt{}.docx'.format(queue_number))
  
  return queue_number
  
your_number = print_reciept(your_number)
