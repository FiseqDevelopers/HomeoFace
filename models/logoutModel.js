export default class LogoutModel {
    id;
    version;

    constructor(
        id = '',
        version = '',
    ) {
        this.id = id;
        this.version = version;
    }
}