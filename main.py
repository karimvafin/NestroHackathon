import pandas as pd

from src.ClientPropagator import ClientPropagator

import src.data as data
from src.total_revenue import calculate_total_revenue

# CL = ClientPropagator(data.roads_df['potential'])
CL = ClientPropagator()
best_places = []
clients = []
for ind, road in data.roads_df.iterrows():
    best_place, client = CL.best_place(road['Номер'])
    best_places.append(best_place)
    clients.append(client)

road_best_place_df = data.roads_df.copy()
road_best_place_df['best_place'] = pd.Series(best_places)
road_best_place_df['clients'] = pd.Series(clients)
road_best_place_df.to_excel('road_best_place.xlsx')
