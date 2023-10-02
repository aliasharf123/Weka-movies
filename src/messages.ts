export  const success = (Name : string | undefined , Type : 'deleted' | 'Added' ,messageApi : any) => {
    messageApi.open({
      type: 'success',
      content: Name + ' is successfully ' + Type ,
    });
  };
export const error = (messageApi : any) => {
    messageApi.open({
        type: 'error',
        content: 'This is an error message',
    });
};
export const loading = (messageApi : any ,Name : string | undefined ) => {
  messageApi.open({
    type: 'loading',
    content: `Action in progress..`,
    duration: 0,
  });
};