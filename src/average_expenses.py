'''
Модуль рассчитывает средний чек на заправке
'''
import pandas as pd
import numpy as np


def calculate_total_revenue(clients_data_file_path="../data/revenue/input/NameClients.xlsx",
                            data_traffic_file_path="../data/revenue/input/traffic.xlsx",
                            data_fuel_file_path="../data/revenue/input/fuel.xlsx",
                            data_das_file_path="../data/revenue/input/das.xlsx"):
    """
        Функция рассчитывает прибыль заправок за определенный период

        Args:
            clients_data_file_path (str): путь к excel файлу с данными о количестве клиентов на заправке.
              'Name' - название дороги,
              'clients' - кол-во клиентов на заправке.

            data_traffic_file_path (str):
               '< 5,5 m', '5,5 - 12 m', '12 - 16,5 m', '> 16,5 m' - трафик на дороге по соответствующим длинам кузова.

            data_fuel_file_path (str):
                '95, euro', 'Deisel, euro' - стоимость 95 бензина и дизеля в евро для каждой заправки.


        Returns:
            запись в файл данные с прибылью для всех предоставленных заправок
    """
    # чтение данных
    data = pd.read_excel(clients_data_file_path)
    data_traffic = pd.read_excel(data_traffic_file_path)
    data_fuel = pd.read_excel(data_fuel_file_path)
    data_das = pd.read_excel(data_das_file_path)

    # расчет типов машин клиентов на завправках
    data['< 5,5 m'] = np.int32(data_traffic['< 5,5 m'] * data['clients'])
    data['5,5 - 12 m'] = np.int32(data_traffic['5,5 - 12 m'] * data['clients'])
    data['12 - 16,5 m'] = np.int32(data_traffic['12 - 16,5 m'] * data['clients'])
    data['> 16,5 m'] = np.int32(data_traffic['> 16,5 m'] * data['clients'])

    tankV55 = 45
    tankV5_12 = 80
    tankV12_16 = 300
    tankV16 = 1200

    # расчет прибыли
    # от реализации топлива
    fuel_revenue = ((data['< 5,5 m'] * tankV55 + data['5,5 - 12 m'] * tankV5_12) * data_fuel['95, euro'] +
                    (data['12 - 16,5 m'] * tankV12_16 + data['> 16,5 m'] * tankV16) * data_fuel['Deisel, euro'])

    # от ДАС
    das_revenue = data_das['средний чек на ДАС в районе'] * data['clients']

    total_revenue = pd.DataFrame(data={'Название': data['Name'],
                                       'Доход от реализации топлива, евро': fuel_revenue,
                                       'Доход от ДАС, евро': das_revenue,
                                       'Итог, евро': fuel_revenue*das_revenue})

    total_revenue.to_excel("../data/revenue/output/total_revenue.xlsx")



calculate_total_revenue()
