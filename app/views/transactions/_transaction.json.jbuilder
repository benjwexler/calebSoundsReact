json.extract! transaction, :id, :user_id, :kit_id, :price, :email, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)
