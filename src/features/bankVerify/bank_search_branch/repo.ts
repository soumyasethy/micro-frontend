export const IFSCSearchActionRepo = async (
  bankCode: string,
  searchKey: string
) => {
  // console.warn(
  //   "IFSCSearchActionRepo->",
  //   " bankCode ",
  //   bankCode,
  //   " searchKey ",
  //   searchKey
  // );
  if (!bankCode && !searchKey) return;
  const requestOptions = {
    method: "GET",
  };

  return await fetch(
    // `${api.bankInfoSearch}${bankCode}/${searchKey}`,
    `http://Beta-AppOr-Y52XUD3GNV47-417447330.ap-south-1.elb.amazonaws.com:80/util/bankInfo/search/${bankCode.toUpperCase()}/${searchKey.toUpperCase()}`,
    requestOptions
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));
};
