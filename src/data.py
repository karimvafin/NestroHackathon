import pandas as pd
from geopy.distance import geodesic

# Выгрузка данных
# roads_df = pd.read_excel("data/roads_potential.xlsx")
roads_df = pd.read_excel("data/roads.xlsx")
cities_df = pd.read_excel("data/latlonCities.xlsx")
cities_df['ratio'] = cities_df['Population'] / cities_df['Population'].max()
shopping_malls_df = pd.read_excel("data/shopping_mall.xlsx")
nestro_stations_df = pd.read_excel("data/latlonNestroStations.xlsx")
traffic_df = pd.read_excel("data/traffic_daily.xlsx")
other_stations_df = pd.read_excel("data/gas_station.xlsx")

# Данные о близлежащих городах, АЗС и ТЦ
cities = []
nestro_stations = []
other_stations = []
shopping_malls = []

# Для каждой дороги определяются близлежащие точки и сохраняются в массивы
for ind, road in roads_df.iterrows():
    # Координаты начала дороги
    road_lat_start = eval(road['origin_coords'])[0]
    road_lon_start = eval(road['origin_coords'])[1]

    # Координаты конца дороги
    road_lat_end = eval(road['destination_coords'])[0]
    road_lon_end = eval(road['destination_coords'])[1]

    is_in = lambda lat, lon, r: geodesic((lat, lon), (road_lat_start, road_lat_start)) < r or geodesic((lat, lon), (
        road_lat_end, road_lat_end)) < r
    # Города
    radius_cities = 100  # в каком радиусе выбирать города
    cities.append(cities_df[((cities_df['lat'] - road_lat_start) ** 2 +
                             (cities_df['lon'] - road_lon_start) ** 2 < (radius_cities / 6400) ** 1) | (
                                    (cities_df['lat'] - road_lat_end) ** 2 + (
                                    cities_df['lon'] - road_lon_end) ** 2 < (radius_cities / 6400) ** 1)]['City'])

    # АЗС Nestro
    radius_nestro_stations = 10
    nestro_stations.append(nestro_stations_df[((nestro_stations_df['lat'] - road_lat_start) ** 2 +
                                               (nestro_stations_df['lon'] - road_lon_start) ** 2 < (
                                                       radius_nestro_stations / 6400) ** 1) | (
                                                      (nestro_stations_df['lat'] - road_lat_end) ** 2 +
                                                      (nestro_stations_df['lon'] - road_lon_end) ** 2 < (
                                                              radius_nestro_stations / 6400) ** 1)][
                               'lat'])

    # Торговые центры
    radius_shopping_malls = 10
    shopping_malls.append(shopping_malls_df[((shopping_malls_df['lat'] - road_lat_start) ** 2 +
                                             (shopping_malls_df['lon'] - road_lon_start) ** 2 < (
                                                     radius_shopping_malls / 6400) ** 1) | (
                                                    (shopping_malls_df['lat'] - road_lat_end) ** 2 +
                                                    (shopping_malls_df['lon'] - road_lon_end) ** 2 < (
                                                            radius_shopping_malls / 6400) ** 1)][
                              'name'])

    # АЗС других компаний
    radius_stations = 10
    other_stations.append(other_stations_df[((other_stations_df['lat'] - road_lat_start) ** 2 +
                                             (other_stations_df['lon'] - road_lon_start) ** 2 < (
                                                     radius_stations / 6400) ** 1) | (
                                                    (other_stations_df['lat'] - road_lat_end) ** 2 +
                                                    (other_stations_df['lon'] - road_lon_end) ** 2 < (
                                                            radius_stations / 6400) ** 1)][
                              'name'])

    # Добавляем данные в таблицу
    roads_df['cities'] = pd.Series(cities)
    roads_df['nestro_stations'] = pd.Series(nestro_stations)
    roads_df['shopping_malls'] = pd.Series(shopping_malls)
    roads_df['other_stations'] = pd.Series(other_stations)
