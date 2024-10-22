import sys
import pickle
import json
import pandas as pd  # Assurez-vous que pandas est bien installé

def load_model():
    with open('F:/m2/projet/frontOfficeAdmin/Back_Admin/scripts/user_product_matrix.pkl', 'rb') as f:
        user_product_matrix = pickle.load(f)
    return user_product_matrix

# Fonction pour obtenir les recommandations
def get_recommendations(user_id, user_product_matrix, num_recommendations):
    # Simuler des recommandations : Prenez les produits les plus fortement notés par l'utilisateur
    if user_id not in user_product_matrix.index:
        return pd.DataFrame({'error': ['User ID not found']})
    
    # Trier les produits par score pour l'utilisateur et prendre les "num_recommendations" produits
    user_ratings = user_product_matrix.loc[user_id].sort_values(ascending=False)
    top_recommendations = user_ratings.head(num_recommendations)
    
    # Retourner les recommandations sous forme de DataFrame
    return pd.DataFrame(top_recommendations).reset_index().rename(columns={user_id: 'score', 'index': 'product'})

def recommend(user_id, num_recommendations):
    user_product_matrix = load_model()
    recommendations = get_recommendations(user_id=user_id, user_product_matrix=user_product_matrix, num_recommendations=num_recommendations)
    return recommendations

if __name__ == "__main__":
    user_id = int(sys.argv[1])
    num_recommendations = int(sys.argv[2])
    
    recommendations = recommend(user_id, num_recommendations)
    print(json.dumps(recommendations.to_dict()))  # Afficher en JSON pour être lisible par Node.js
