export const currenKeys: any = {
  USD: "$",
};

export const durationFormator = (value: any) => {
  const remPt = value?.split("PT")[1];
  let remH = remPt?.split("H");
  let tArr = remH?.[0] + "H" + " " + remH?.[1];
  return tArr;
};
