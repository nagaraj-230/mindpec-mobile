export const BASE_URL = 'http://154.61.80.116:1075/api/';

export const LOGIN = BASE_URL + 'AppLogin';
// task list
export const GET_TASK_STATUS = BASE_URL + 'AppGetTaskStatus'
export const GET_CATEGORIES = BASE_URL + 'GetCategories'
export const GET_TASKS = BASE_URL + 'AppGetTasks'
export const UPDATE_TASKS = BASE_URL + 'AppUpdateTasks'
// AppUpdateTasks-- {"TaskID":1,"CompanyID":1,"ClientID":1,"TaskName":"Task1","TaskCreationDate":"2024-11-26","TaskStartDate":"2024-11-26","TaskEndDate":"2024-11-30",
//     "TaskDescription":"Task Creation","PriorityID":1,"TargetValue":10,"AchievedValue":7.5,"UOM_ID":1,"StatusID":1,"AppUserID":1}
    
// dashbaord
export const DASHBOARD_TASK_COUNT = BASE_URL + 'AppDashboard'


// claims screen
export const CLAIMS_TYPE = BASE_URL + 'AppGetClaimType'
export const GET_CLAIMS = BASE_URL + 'AppGetClaims'
export const UPDATE_CLAIMS = BASE_URL + 'AppUpdateClaims'
export const GET_CLAIM_STATUS = BASE_URL + 'AppGetClaimStatus'

// company users
export const GET_COMAPNY_USERS = BASE_URL + 'GetCompanyUsers'
export const GET_TASK_ASSIGNMENTs = BASE_URL + 'AppGetTaskAssignments'


// status history
export const UPDATE_TASK_STATUS_HISTORY = BASE_URL + ' AppUpdateTaskStatusHistory'
export const GET_TASK_STATUS_HISTORY = BASE_URL + 'AppGetTaskStatusHistory'

