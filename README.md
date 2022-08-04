# Cherish-Server-Lab
서현 🖤-> 정아 &lt;-🖤 지윤 Cherish 연습실

# Nest.js

## 목차

[Intro](#Intro)

[Installation](#Installation)

[Directory](#Directory)

[Platform](#Platform)

### 들어가기 전에

해당 내용은 [Nest.js official document](https://docs.nestjs.com/) 내용을 개인적으로 학습하며, 번역한 글 입니다.

### Intro

<hr/>

Nest.js 란 효율적이고, 확장 가능한 Node.js Server application 을 구축하기 위한 framework 이다.

Typescript 를 지원하고, 또한 Javascript 역시 지원한다. 더불어 OOP (객체 지향 프로그래밍), FP(함수형 프로그래밍) 의 요소를 결합하고 있다.

Nest 는 Express 같은 HTTP Server framework 를 사용하고, 선택적으로 Fastify 도 사용할 수 있다.

### Installation

<hr/>

```shell
$ npm i -g @nestjs/cli
$ nest new project-name
```

시작하기 위해 Nest Cli 를 사용할 수 있다.

스타터 프로젝트롤 clone 하여 시작할 수도 있지만, 처음 사용자는 Nest Cli 를 통해 만드는 것을 추천한다.

typescript 의 strict 모드를 활성화 시켜 만드려면 --strict option 을 추가해준다.

<img width="400" alt="image" src="https://user-images.githubusercontent.com/20807197/182793064-5e07d710-93ad-401b-8106-ac5836bb329a.png">


package manager 는 yarn 을 선택했다.

```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "semi": true,
  "trailingComma": "all"
}
```

prettier 와 eslint 가 기본적으로 설정되지만 조금 추가해줬다.

프로젝트가 만들어지고 `yarn start`  를 터미널에 입력하면, localhost:3000 에서 서버가 시작된다.

변경 사항을 감지하려면 `yarn start:dev`  를 입력하면 된다.

<img width="300" alt="image" src="https://user-images.githubusercontent.com/20807197/182793092-1350a6b8-39ae-43ad-ad49-95e68e7743a3.png">

### Directory

<hr/>

프로젝트를 생성하면 src/ 폴더 내부에 core 파일이 생긴다.

간략하게 살펴보면,

`app.controller.ts` 단일 경로가 있는 기본 컨트롤러

`app.controller.spec.ts` 컨트롤러를 위한 유닛 테스트

`app.module.ts` 애플리케이션의 루트 모듈

`app.service.ts` 기본 서비스

`main.ts` 핵심 기능인 `NestFactory` 를 사용하여 Nest application instance 를 생성하는 시작 파일

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

`main.ts` 는 application 을 bootstrap 하는 비동기 함수를 포함한다.

Nest application instance 를 사용하기 위해 우리는 `NestFactory` class 를 사용한다.

`NestFactory` 는 application instance 를 생성하게 해주는 몇가지 정적 메서드를 제공한다.

`create()` 은 `INestApplication` 인터페이스를 수행하는 application 객체를 반환한다.

이 객체는 후술할 메서드 집합을 제공한다.

`main.ts` 에서 우리는 단순히 application 이 inbound HTTP 요청을 기다리게 하는 HTTP listner 를 시작하기만 하면 된다.

Nest CLI 를 통해 생성된 프로젝트는 개발자가 각 모듈을 고유한 전용 디렉터리에 보관하도록 하는 규칙을 따르도록 권장하는 초기 프로젝트 구조이다.

> 기본적으로 application 을 생성하는 동안 발생하는 오류는 code 1과 함께 종료된다.
>
> 따라서 에러를 발생시키고 싶으면 abortOnError 옵션을 비활성화 하면 된다.
>
> e.g., `NestFactory.create(AppModule, { abortOnError: false })`

### Platform 

<hr/>

우선 Nest 는 Platform 에 구애받지 않는 프레임워크를 목표로 한다.

플랫폼 독립성을 통해 개발자가 여러 다른 유형의 application 에서 재사용 가능한 논리적인 부분을 만들 수 있도록 한다.

기본적으로 두가지 HTTP Platform 을 제공한다. - express, fastify

1. `platform-express`

잘 알려진 minimalist 웹 프레임워크이다.

커뮤니티에서 구현해둔 많은 리소스가 존재한다.

`@nestjs/patform-express` package 를 기본적으로 사용한다.

많은 사용자가 express 를 사용하고 있으며 특별히 이걸 사용하기 위해 다른 걸 할 필요는 없다.

2. `platform-fastify`

최대 성능과 속도 제공에 중점을 둔 고 성능, 낮은 오버헤드 프레임워크이다.

express 에 비해 아직 사용성이나 커뮤니티는 낮지만, 굉장한 속도를 제공한다.

> 어떤 platform 이 사용되든, 자체 interface 를 노출한다.
>
> `NestExpressAplication` , `NestFastifyApplication` 

`NestFactory.create()` 메서드에 직접 type 을 넘길 수도 있다.

```typescript
const app = await NestFactory.create<NestExpressApplication>(AppModule);
```

하지만 일반적으로 특별히 해당 Platform API 에 직접 접근하려는 게 아닌 이상 할 필요는 없다.


