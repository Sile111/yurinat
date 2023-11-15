export class DbRequest {
    //dadadata: a99129afd66b1617593dbf2633745565b9c18f54
    //2gis: 40fe5f24-615a-4fbc-8607-544388a48264

    link = 'http://localhost:4545';

    linkDbOne = 'https://my-json-server.typicode.com/Sile111/yurinat-server';
    linkDbTwo = 'https://my-json-server.typicode.com/Sile111/yurinat-server2';

    getNews = async () => {
        return  fetch(`${this.linkDbTwo}/news`).then(res => res.json());
    }
    getNewItem = async (id) => {
        return fetch(`${this.linkDbTwo}/news/${id}`).then(res => res.json());
    }
    deleteNews = async (id) => {
        fetch(`${this.linkDbTwo}/news/${id}`, {
            method: 'DELETE'
        });
    }
    addNews = async (item, method, link) => {
        fetch(`${this.linkDbTwo}/${link}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)

        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {

                admin.renderNews();
                return res;
            }
        });
    }


    getCost = async () => {
        return fetch(`${this.linkDbOne}/metaData`).then(res => res.json());
    }

    getDistance = async (latFrom, lonFrom, latTo, lonTo) => {
            const getDistanceFromLatLonInKm = (lat1,lon1,lat2,lon2) => {
            let R = 6371; // Radius of the earth in km
            let dLat = deg2rad(lat2-lat1);  // deg2rad below
            let dLon = deg2rad(lon2-lon1);
            let a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            let d = R * c; // Distance in km
            return d;
        }

        const deg2rad = (deg) => {
            return deg * (Math.PI/180)
        }

        console.log(getDistanceFromLatLonInKm(latFrom, lonFrom, latTo, lonTo))

        return getDistanceFromLatLonInKm(latFrom, lonFrom, latTo, lonTo)
    }

    getRequests = async (service) => {
        return fetch(`${this.linkDbOne}/${service}Applications`).then(res => res.json());
    }

    addRequest = async (request, serviceType, insert, delStrips = 'no', itemsArr = '') => {
        fetch(`${this.linkDbOne}/${serviceType}Applications`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request)
        })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    insert.append(create.createSuccess());
                    control.successControl();

                    if (delStrips !== 'no') {
                        document.querySelectorAll('.calc__strip-container').forEach(e => e.remove());
                        itemsArr = itemsArr.splice(0, itemsArr.length);
                    }

                    return res;
                } else {
                    insert.append(create.createSuccess('no'));
                    control.successControl();

                    if (delStrips !== 'no') {
                        document.querySelectorAll('.calc__strip-container').forEach(e => e.remove());
                        itemsArr = itemsArr.splice(0, itemsArr.length);
                    }

                    let error = new Error(res.statusText);
                    error.response = res;
                    throw error
                }
            });
    }

    getCoords = async (postalId, coordsFrom, insert, requestItemsArr, service, itemId) => {
        let url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/postal_unit';
        let token = 'a99129afd66b1617593dbf2633745565b9c18f54';
        let query = `${postalId}`;

        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify({query: query})
        }

        const loader = create.createSuccess('wait');
        insert.append(loader);

        fetch(url, options)
            .then(response => response.text())
            .then(async result => {

                const coordsTo = {
                    lat: JSON.parse(result).suggestions[0].data.geo_lat,
                    lon: JSON.parse(result).suggestions[0].data.geo_lon,
                }

                // const getDist = (original) => {
                //     let str = original.result;
                //     let arr = str.split('>');
                //     arr = arr[2].split('<')
                //     str = arr[0]
                //
                //
                //     return Number(str.replace(/\s/g, ""));
                // }

                if (service === 'request') {
                    const distance = await this.getDistance(coordsFrom.lat, coordsFrom.lon, coordsTo.lat, coordsTo.lon)



                    const cost = await this.getCost();

                    const price = Math.floor(+cost[0].kmCost * distance);


                    insert.append(create.createFinalRequest(price === 0 ? 5000 : price));
                    loader.remove();
                    control.controlRequestFinal(requestItemsArr, service, String(distance), itemId);
                    document.body.style.overflow = 'hidden';

                } else if (service === 'trans') {
                    const distanceFinal =  await this.getDistance(coordsFrom.lat, coordsFrom.lon, coordsTo.lat, coordsTo.lon);

                    const cost = await this.getCost();

                    const price = Math.floor((+cost[0].transCost * await distanceFinal));

                    insert.append(create.createFinalRequest(price === 0 ? 5000 : price));
                    loader.remove();
                    control.controlRequestFinal(requestItemsArr, service, await distanceFinal, itemId);
                    document.body.style.overflow = 'hidden';
                }

            })
            .catch(error => {
                loader.remove();

                insert.append(create.createSuccess('no'));
                control.successControl();

            });
    }

    editRequest = async (item, serviceType, id) => {
        fetch(`${this.linkDbOne}/${serviceType}Applications/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {

                admin.renderCards();
                return res;
            }
        })
    }

    deleteRequest = async (serviceType, id) => {
        fetch(`${this.linkDbOne}/${serviceType}Applications/${id}`, {
            method: 'DELETE',
            // headers: {
            //     "Content-Type": "application/json",
            // },
            // body: JSON.stringify(item)
        });
    }

    getPrice = async () => {
        return fetch(`${this.linkDbTwo}/metaData`).then(res => res.json());
    }
    setPrice = async (item) => {
        fetch(`${this.linkDbTwo}/metaData/1`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        });
    }

    getAdmins = async (id = 'no') => {
        if (id === 'no') {
            return fetch(`${this.linkDbOne}/admins`).then(res => res.json());
        } else {
            return fetch(`${this.linkDbOne}/admins/${id}`).then(res => res.json());
        }
    }

    deleteAdmins = async (id) => {
        fetch(`${this.link}/admins/${id}`, {
            method: 'DELETE'
        });
    }
    addAdmins = async (item, method, link) => {
        fetch(`${this.linkDbOne}/${link}`, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)

        }).then((res) => {
            if (res.status >= 200 && res.status < 300) {

                admin.renderAdmins();
                return res;
            }
        });
    }




    // addRequest = (request, serviceType) => {
    //     request.forEach(e => {
    //         fetch(`${this.link}/${serviceType}Applications`, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(e)
    //         }).then(res => res.json());
    //     });
    // }

}
