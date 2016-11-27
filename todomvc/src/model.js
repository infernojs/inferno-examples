const STOR = window.localStorage;
const STOR_ID = 'todos-inferno';

export default class Model {
	get = () => (this.data = JSON.parse(STOR.getItem(STOR_ID) || '[]'))

	set = arr => {
		this.data = arr || this.data || [];
		STOR.setItem(STOR_ID, JSON.stringify(this.data));
		return this.data;
	}
}
