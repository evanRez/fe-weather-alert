
export const debounce =  (callback: any, wait: number) => {
    let timeoutId: any = null;
    return (...args: any) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(()  => {
         callback.apply(null, args);
      }, wait);
    };
  }





//     var name = 'San Francisco'
// $.ajax({
//     method: 'GET',
//     url: 'https://api.api-ninjas.com/v1/city?name=' + name,
//     headers: { 'X-Api-Key': VITE_API_NINJA_CITY_KEY},
//     contentType: 'application/json',
//     success: function(result) {
//         console.log(result);
//     },
//     error: function ajaxError(jqXHR) {
//         console.error('Error: ', jqXHR.responseText);
//     }
// });

  // <script type="text/javascript">
    //   (async () => {
    //     const where = encodeURIComponent(JSON.stringify({
    //       "name": {
    //         "$regex": "Rich+"
    //       }
    //     }));
    //     const response = await fetch(
    //       `https://parseapi.back4app.com/classes/Usabystate_VA?skip=1&limit=10&keys=cityId,containingState,name&where=${where}`,
    //       {
    //         headers: {
    //           'X-Parse-Application-Id': 'vwGc0q9HuJ9dHv2GGUIHxITfnIfkrReOam5E9ZoA', // This is your app's application id
    //           'X-Parse-REST-API-Key': 'HZCigQrACxgm6q15qlym2VmxuGNxVc7T7nkVNEpd', // This is your app's REST API key
    //         }
    //       }
    //     );
    //     const data = await response.json(); // Here you have the data that you need
    //     console.log(JSON.stringify(data, null, 2));
    //   })();
    // </script