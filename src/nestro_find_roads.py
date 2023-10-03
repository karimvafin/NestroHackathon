import pandas as pd
import numpy as np
from src.ClientPropagator import ClientPropagator
import random

import src.data_for_clients as data

# nestro_stations = pd.read_excel('../data/origin/latlonNestroStations.xlsx')
# roads = pd.read_excel('../data/origin/roads.xlsx')
# nestro_stations_roads = []
# nestro_stations_roads_min = []
#
# radius = 1  # km
# for ind, st in nestro_stations.iterrows():
#     lat = st['lat'] / 180 * np.pi
#     lon = st['lon'] / 180 * np.pi
#     minr = 100
#     road = 0
#     for i, r in roads.iterrows():
#         try:
#             for p in eval(r['roads_coords']):
#                 lat1 = p[0] / 180 * np.pi
#                 lon1 = p[1] / 180 * np.pi
#                 # minr = min(np.sqrt((lat1 - lat)**2 + (lon - lon1)**2) * 6400, minr)
#                 s = np.sqrt((lat1 - lat)**2 + (lon - lon1)**2) * 6400
#                 if s < minr:
#                     minr = s
#                     road = r['Номер']
#         except:
#             pass
#     nestro_stations_roads_min.append(minr)
#     nestro_stations_roads.append(road)
#
# nestro_stations['road'] = pd.Series(nestro_stations_roads)
# nestro_stations['rmin'] = pd.Series(nestro_stations_roads_min)
#
# nestro_stations.to_excel('../data/clients/NestroStations.xlsx')
# print(nestro_stations_roads)

nestro_stations = pd.read_excel('../data/clients/NestroStations.xlsx')
roads = pd.read_excel('../data/clients/roads_potential.xlsx')
traffic = pd.read_excel('../data/origin/traffic_daily.xlsx')

CL = ClientPropagator(roads['potential'], False)

clients = []
for ind, st in nestro_stations.iterrows():
    points = {}
    road_ind = st['road']
    try:
        road = roads[roads['Номер'] == road_ind].iloc[0]
        for point in eval(road['roads_coords']):
            points[tuple(point)] = CL.propagate(road_ind, point[0], point[1])
        points[(st['lat'], st['lon'])] = CL.propagate(road_ind, st['lat'], st['lon'])
        places = {
            i: CL.linear_transform(j, min(points.values()), max(points.values()), 0.3,
                                     1) * CL.client_traffic_ratio *
               traffic[traffic['Номер'] == road_ind].iloc[0]['Авто в день'] for i, j in
            points.items()}
    except:
        places = {}

    client = places[(st['lat'], st['lon'])]
    clients.append(client if client != 0 else random.randint(5*10**6, 3*10**7)/1e6)

nestro_stations['clients'] = pd.Series(clients)
nestro_stations.to_excel('../data/clients/NestroStations.xlsx')
