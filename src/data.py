import pandas as pd

roads_df = pd.read_excel("../data/roads.xlsx")
cities_df = pd.read_excel("../data/latlonCities.xlsx")
cities_df['ratio'] = cities_df['Population'] / cities_df['Population'].max()
shopping_malls_df = pd.read_excel("../data/shopping_mall.xlsx")
nestro_stations_df = pd.read_excel("../data/latlonNestroStations.xlsx")
traffic_df = pd.read_excel("../data/traffic.xlsx")
other_stations_df = pd.read_excel("../data/gas_station.xlsx")

cities = []
nestro_stations = []
other_stations = []
shopping_malls = []

for ind, road in roads_df.iterrows():
    road_lat_1 = eval(road['origin_coords'])[0]
    road_lon_1 = eval(road['origin_coords'])[1]
    road_lat_2 = eval(road['destination_coords'])[0]
    road_lon_2 = eval(road['destination_coords'])[1]
    cities.append(cities_df[((cities_df['lat'] - road_lat_1)**2 +
                (cities_df['lon'] - road_lon_1)**2 < 100./6400) | ((cities_df['lat'] - road_lat_2)**2 + (cities_df['lon'] - road_lon_2)**2 < 100./6400)]['City'])
    nestro_stations.append(nestro_stations_df[((nestro_stations_df['lat'] - road_lat_1)**2 +
                (nestro_stations_df['lon'] - road_lon_1)**2 < 10./6400) | ((nestro_stations_df['lat'] - road_lat_2)**2 +
                (nestro_stations_df['lon'] - road_lon_2)**2 < 10./6400)]['lat'])
    # other_stations.append()
    shopping_malls.append(shopping_malls_df[((shopping_malls_df['lat'] - road_lat_1)**2 +
                (shopping_malls_df['lon'] - road_lon_1)**2 < 10./6400) | ((shopping_malls_df['lat'] - road_lat_2)**2 +
                (shopping_malls_df['lon'] - road_lon_2)**2 < 10./6400)]['name'])
    other_stations.append(other_stations_df[((other_stations_df['lat'] - road_lat_1) ** 2 +
                                             (other_stations_df['lon'] - road_lon_1) ** 2 < 10. / 6400) | (
                                                        (other_stations_df['lat'] - road_lat_2) ** 2 +
                                                        (other_stations_df['lon'] - road_lon_2) ** 2 < 10. / 6400)][
                              'name'])


roads_df['cities'] = pd.Series(cities)
roads_df['nestro_stations'] = pd.Series(nestro_stations)
roads_df['shopping_malls'] = pd.Series(shopping_malls)
roads_df['other_stations'] = pd.Series(other_stations)
