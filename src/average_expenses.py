'''
Модуль рассчитывает средний чек на заправке
'''
import pandas as pd
import numpy as np
def average_expenses(clients_number):
    """
        Args:
            clients (int): количество клиентов на заправке за период
        Returns:
            revenue: list[выручка от топлива, выручка от ДАС] за пероид
    """
    fuelPrice = [1.432, 1.483]  # цена на [95 бензин, дизель] в 2023 году за литр
    tankCapacity = [50, 500]  # обьем бака у легкового авто и фуры

    transportType = [0.7, 0.3]

    fuelRev = clients_number * (
                transportType[0] * fuelPrice[0] * tankCapacity[0] + transportType[1] * fuelPrice[1] * tankCapacity[1])
    DASrev = fuelRev * 0.1

    return [fuelRev, DASrev]

# data_for_calculation = pd.read_excel('../data/road_best_place.xlsx')['clients']
# data_for_calculation = data_for_calculation.apply(lambda x: average_expenses(x))
#
# output_data = pd.DataFrame(data={'Выручка от реализации топлива, евро': data_for_calculation.apply(lambda x: x[0]), 'Выручка от ДАС, евро': data_for_calculation.apply(lambda x: x[1])})
# output_data.to_excel("../data/revenueFuelDAS.xlsx")


def calculate_total_revenue(data_file_path="../data/revenue/cars.xlsx"):
    """
        Функция рассчитывает прибыль заправок за определенный период

        Args:
            data_file_path (str): путь к excel файлу с необходимыми данными

        Returns:
            запись в файл данные с прибылью для всех предоставленных заправок
    """
    data = pd.read_excel(data_file_path)
    print(data)


calculate_total_revenue()
