export const simpleGetRequest = async url => {
	try {
		const response = await fetch(url);
		const data = response.json();
		return data;
	} catch (error) {
		const err = {
			error:
				'error fetching with simpleGetRequest from serverRequests in Utils',
			body: error
		};
		return err;
	}
};
