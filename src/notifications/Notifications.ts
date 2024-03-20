import {message} from "antd";

export interface IConfig {
    massage: string;
    key?: string;
}

export interface INotifications {
    success: (config: IConfig) => void;
    error: (config: IConfig) => void;
    warning: (config: IConfig) => void;
    loading: (config: IConfig) => void;
    info: (config: IConfig) => void;
    destroy: (key: string) => void;
}

class Notifications implements INotifications {
    success(config: IConfig) {
        message.open({duration: 3, type: 'success', content: config.massage, key: config.key});
    }
    error(config: IConfig) {
        message.open({duration: 3, type: 'error', content: config.massage, key: config.key});
    }
    warning(config: IConfig) {
        message.open({duration: 3, type: 'warning', content: config.massage, key: config.key});
    }
    loading(config: IConfig) {
        message.open({duration: 0, type: 'loading', content: config.massage, key: config.key});
    }
    info(config: IConfig) {
        message.open({duration: 3, type: 'info', content: config.massage, key: config.key});
    }
    destroy(key: string) {
        message.destroy(key);
    }
}

export const customNotifications: INotifications = new Notifications();