export default class LoginModel {
    email: string;
    password: string;
    isActive: bool;
    appBuild: string;
    appVersion: string;
    deviceName: string;
    id: string;
    idiom: string;
    isDevice: bool;
    manufacturer: string;
    model: string;
    platform: string;
    version: string;

    constructor(
        email = '',
        password = '',
        isActive = false,
        appBuild = '',
        appVersion = '',
        deviceName = '',
        id = '',
        idiom = '',
        isDevice = false,
        manufacturer = '',
        model = '',
        platform = '',
        version = '',
    ) {
        this.email = email;
        this.password = password;
        this.isActive = isActive;
        this.appBuild = appBuild;
        this.appVersion = appVersion;
        this.deviceName = deviceName;
        this.id = id;
        this.idiom = idiom;
        this.isDevice = isDevice;
        this.manufacturer = manufacturer;
        this.model = model;
        this.platform = platform;
        this.version = version;
    }
}