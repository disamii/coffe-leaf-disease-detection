import { apiRequest } from "./APIrequest"

const Predict_for_farmer_URL='http://127.0.0.1:8000/api/predict_for_farmer/'
const Train_model='http://127.0.0.1:8000/api/coffe_leaf/?model_type=train'
const Test_model='http://127.0.0.1:8000/api/coffe_leaf/?model_type=test'
const predict_for_researcher='http://127.0.0.1:8000/api/predict_for_researcher/'

export async function predictForFarmer(data){
return await apiRequest(Predict_for_farmer_URL,'POST',data)
}

export async function trainModel(data){
    return await apiRequest(Train_model,'POST',data)
}

export async function testModel(data){
    return await apiRequest(Test_model,'POST',data)
}
export async function predictForRsearcher(data){
    return await apiRequest(predict_for_researcher,'POST',data)
    }