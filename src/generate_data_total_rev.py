import numpy as np
import pandas as pd

data_for_calculation = pd.read_excel('../data/revenue/NameClients.xlsx')

size = 157
mean_cars = 0.89
cars55 = mean_cars * np.ones(size) + np.random.normal(loc=0., scale=0.04, size=size)
cars5_12 = np.abs(np.ones(size) - cars55) * 0.6
cars12_16 = np.abs(np.ones(size) - cars55) * 0.3
cars16 = np.abs(np.ones(size) - cars55) * 0.1
data_for_calculation['< 5,5 m'] = np.int32(cars55 * data_for_calculation['clients'])
data_for_calculation['5,5 - 12 m'] = np.int32(cars5_12 * data_for_calculation['clients'])
data_for_calculation['12 - 16,5 m'] = np.int32(cars12_16 * data_for_calculation['clients'])
data_for_calculation['> 16,5 m'] = np.int32(cars16 * data_for_calculation['clients'])


data_for_calculation.to_excel("../data/revenue/cars.xlsx")
