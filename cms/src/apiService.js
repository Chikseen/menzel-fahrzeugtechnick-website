const apiService = {
  //DATA FETCHER
  async get(adress) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "GET",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
  async post(adress, payload) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
  async put(adress, payload) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "PUT",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
  async patch(adress, payload) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
  async delete(adress, payload) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      body: JSON.stringify(payload),
      credentials: "include",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
  async uploadFile(adress, payload) {
    const request = await fetch(`${process.env.VUE_APP_API}/${adress}`, {
      body: payload,
      credentials: "include",
      headers: {
        accept: "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundaryuiM9OMOoLOPmRAFU",
      },
      method: "POST",
      mode: "cors",
      redirect: "follow",
    });
    return await request.json();
  },
};

export default apiService;
