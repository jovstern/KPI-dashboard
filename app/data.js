import http from 'axios';



function makeArr(response) {
    let newArr = [];

    for (let i in response) {
        let name = response[i][0];
        let value = response[i][1].doc_count;

        newArr.push({name: name, value: value})
    }
    return newArr.slice(0, 5)
}

export function topCategories(today, tomorrow) {
    const url = `/trends-service/trends/by_category/count`;
    const params = {
        start_date: today,
        end_date: tomorrow,
        sort: 'desc',
        count_child: false,
        categories_style: 'name'
    };

    return http.get(url, {params}).then(response => {

        if (response && response.data) {
            return makeArr(response.data.data);
        }
    }).catch(error => {
        throw error;
    })
}

export function getTodayTrends(today, tomorrow) {
    const url = `/trends-service/trends/by_date/count`;
    let params = {
        start_date: today,
        end_date: tomorrow
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })
}

export function getActiveTrends(today, tomorrow) {
    const url = `/trends-service/trends/active/count`;

    let params = {
        start_date: today,
        end_date: tomorrow
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })

}

export function getCampaigns(startDate, endDate, platform) {
    const url = '/api/v1/campaigns/query';
    let params = {
        page_index: 1,
        page_size: 20,
        campaign_date_above: startDate,
        campaign_date_below: endDate,
        platform: platform
    };


    return http.get(url, {params}).then(response => {
        if (response && response.data && response.data.meta) {
            return response.data.meta.total_count;
        }
    }).catch(error => {
        throw error;
    })
}


export function getYoutubeCampaignsFromFirebase(){
    return http.get('/kpi-dashboard-33738.firebaseio.com/', 'youtubeCampaigns')
        .then(response => {
            debugger;
            return response
        })
};

export function getTotalCampaigns(startDate, endDate, platform) {
    const url = '/api/v1/campaigns/total_days';
    let params = {
        start_date: startDate,
        end_date: endDate,
        platform: platform
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })
}

export function getPlatformsSegments(startDate, endDate, platform) {
    const url = '/api/v1/segments/aggregated_day_stats';
    let params = {
        start_date: startDate,
        end_date: endDate,
        platform: platform
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })
}

export function getSegmentsStatus(status) {
    const url = '/api/v1/segments/query';
    let params = {
        sort_by: 'start_date',
        page_index: 1,
        page_size: 20,
        sort_order: 'desc',
        status: status
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data && response.data.meta) {
            return response.data.meta.total_count;
        }
    }).catch(error => {
        throw error;
    })
}

export function getCampaignsImpressionOrSpent(startDate, EndDate, paltform, statsType) {
    const url = '/api/v1/campaigns/aggregated_day_stats';
    let params = {
        start_date: startDate,
        end_date: EndDate,
        platform: paltform,
        stats_type: statsType
    };

    return http.get(url, {params}).then(response => {
        if (response && response.data && response.data.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })
}

export function getURLs() {
    const url = '/api/v1/segments/file_num_placements';

    return http.get(url).then(response => {
        if (response && response.data) {
            return response.data.data;
        }
    }).catch(error => {
        throw error;
    })
}