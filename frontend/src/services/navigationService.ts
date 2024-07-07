import { useRouter } from 'vue-router';

export class NavigationService {

    router = useRouter();

    gotTo = (componentName:string) => {
        this.router.push({ name: componentName });
    }
}