import { ActionFunction } from "@voltmoney/types";
import {TableProps, TextInputProps} from "@voltmoney/schema";
const tableSearchString = "";
// export const mockDATA = MockDataJson;
const searchIndex:number[] = [];


export const TestAction: ActionFunction<any> = async (
  action,
  _datastore,
  { navigate, goBack, setDatastore }
): Promise<any> => {
  // console.warn("**** Test Action Triggered ****", action);
  // tableSearchString = action.payload.value;
  // mockDATA = MockDataJson.filter((data)=>{
  //   if (
  //      searchObject(data, tableSearchString) &&
  //      searchObject(data, tableSearchString).length>0
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // })
  // await setDatastore(action.routeId, 'table', <TableProps> {
  //   data: {...TableDataBuilder(mockDATA).DATA}
  // });
  // console.log("mockDATA: ", mockDATA);
  // if(mockDATA && mockDATA.length > 0) {
  //   mockDATA.map((item , index) => {
  //     Object.keys(item).map((fieldName, indexY)=>{
  //     setDatastore(action.routeId, `${fieldName}_${index}`, <TextInputProps> {
  //       label: `${item[fieldName]}`
  //     });
  //     })})}
};