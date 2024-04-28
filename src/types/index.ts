export interface TableTypes {
    stateid: number;
    districtid: number;
    State: string;
    state_dist_key: string;
    District: string;
    year_val: number;
    jan: number;
    feb: number;
    mar: number;
    apr: number;
    may: number;
    jun: number;
    jul: number;
    aug: number;
    sep: number;
    oct: number;
    nov: number;
    dec: number;
  }
  

  
  export interface Precipitation_2004_2011 {
    State: "text";
    District: "text";
    year_val: "int";
    January: "double";
    February: "double";
    March: "double";
    April: "double";
    May: "double";
    June: "double";
    July: "double";
    August: "double";
    September: "double";
    October: "double";
    November: "double";
    December: "double";
    AnnualTotal: "double";
  }
  