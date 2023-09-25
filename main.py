from src import data
from src.ClientPropagator import ClientPropagator

# CL = ClientPropagator(data.roads_df['potential'])
CL = ClientPropagator(data.roads_df['potential'])
print(CL.find_places(706))
