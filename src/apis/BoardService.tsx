import reqApi from './ApiService';
import {BOARD_LIST_URL} from 'commons/constants/ApiUrl';
import {IApiResponse} from 'types/ApiModel';
import {IBoard, IParam} from '../types/Data';

export interface IBoardReponse {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

class BoardService {
  boardList(params: IParam<any>): Promise<IApiResponse<[IBoard]>> {
    return reqApi.get<IApiResponse<[IBoard]>>(BOARD_LIST_URL, {params});
    //.then(r => console.log(r))
    //.catch(e => {
    //  console.log(e)
    //});
  }
}

export default BoardService;
