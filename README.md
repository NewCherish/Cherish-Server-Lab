# Nest.js

## 목차

[Intro](#Intro)

[Installation](#Installation)

[Directory](#Directory)

[Platform](#Platform)

[Controllers](#Controllers)

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

### Controllers

<hr/>

컨트롤러는 들어오는 요청을 처리하고, 응답을 반환하는 일을 한다.

![img](https://docs.nestjs.com/assets/Controllers_1.png)

컨트롤러의 목적은 application 의 특정 요청을 수신하는 것이다.

라우팅 메커니즘이 어떤 컨트롤러에 어떤 요청을 수신 할 지 조절한다.

종종, 각 컨트롤러에 두 가지 이상의 경로(route) 가 존재할 수 있고, 각 경로에서 다른 action 을 수행할 수 있다.

기본 컨트롤러를 만들기 위해 **class** 와 **decorator**를 사용한다.

decorator 는 class 를 필수 메타 데이터와 연결하고, Nest 가 라우팅 Map(요청을 해당 컨트롤러로 연결) 을 생성하도록 한다.

#### Routing

기본 컨트롤러를 정의하는데 필요한 `@Controller()` decorator 를 사용한다.

`@Controller()` decorator 를 사용하면, 관련 경로를 쉽게 그룹화 하고, 반복적인 코드를 최소화 할 수 있다.

``` shell
$ nest g controller cats
```

CLI 를 통해 생성할 수도 있다.

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'return all cats';
  }
}
```

<img width="300" alt="image" src="https://user-images.githubusercontent.com/20807197/182819183-7b074718-43e0-4247-b1f3-280829de73f6.png">

예를 들어 경로 /customers 아래에서 customers entity 와의 상호작용을 관리하는 경로 집합을 그룹화 할 수 있다.

`findAll()`  메서드 앞에 `@Get()`  은 HTTP 요청 decorator 이다.

경로는 컨트롤러에 선언된 decorator 접두사와 특정한 메서드에서 선언된 decorator 와 연결된다.

위 예제에서는 컨트롤러에서 선언한 'cats' 와 `findAll()`  에서 선언된 `@Get` decorator 가 아무 경로를 연결하지 않았으므로 최종적으로` GET '/cats' ` 요청을 이 핸들러에 매핑한다.

즉, 예를 들어 위 예제에서  `@Get('profile')` 일 경우 `GET '/cats/profile'` 로 매핑된다.

이 메서드에서는 응답 상태 코드로 200을 반환한다. 이 경우에는 문자열('return all cats')일 뿐이다.

왜 이런 걸까?

Nest 가 응답을 조작하기 위해 사용하는 2가지 옵션을 알아보자.



1. **Standard (recommended)**

​	내장 메서드를 사용하면 JS 객체 또는 배열을 반환 할 때 자동으로 JSON 으로 serialized 된다.

​	그러나 JS 기본 타입 (string, number, boolean) 을 반환하면 JSON 이 아닌 값으로 보낸다.

​	값을 반환하기만 하면 Nest 가 알아서 처리한다.

​	또한, 응답 상태 코드는 201을 사용하는 POST 요청을 제외하고는 기본적으로 200 을 반환한다.

​	`@HttpCode()` decorator 를 사용하여 이를 쉽게 조작할 수 있다. (후술함)

2. **Library-specific**

​	`@Res`  decorator 를 메서드 핸들러에 주입하여 라이브러리별 응답 객체를 사용할 수 있다.

​	e.g., `findAll(@Res() response)` 

​	예를 들어, express 에서 사용하는 `response.status(200).send()` 를 사용 할 수도 있다.
#### Request Object

Nest 는 요청 객체에 대한 액세스를 제공한다.

핸들러에 `@Req() decorator` 추가하여 요청 객체에 접근할 수 있다.	

```typescript
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() req: Request): string {
    return 'return all cats';
  }
}
```

요청 객체는 query string, parameters, HTTP headers, body 같은 속성을 가지고 있다.

대부분의 경우 이러한 속성을 수동으로 가져올 필요 없이 Nest 에서 제공하는 전용 decorator 를 사용하면 된다.

| decorator            | property                    |
| -------------------- | --------------------------- |
| @Request(), @Req()   | req                         |
| @Response(), @Res()  | res                         |
| @Next()              | next                        |
| @Session()           | req.session                 |
| @Param(key?: string) | req.params, req.params[key] |
| @Query(key?: string) | req.query, req.query[key]   |
| @Ip()                | req.ip                      |
| @HostParam()         | req.hosts                   |

`@Response()`, `@Res()` 를 사용할 경우 Nest 는 해당 핸들러에 대해 **Library-specific mode** 로 설정하게 되고 이 경우에 응답을 반환해야 할 필요가 있다.

즉, 이 경우 일종의 응답 (res.send, res.json 등) 을 반환해야 하고 그렇지 않으면 서버가 중단된다.

> 사용자 지정 decorator 도 생성 가능하지만 후술하겠다.

#### Resources

모든 고양이를 가져오는 엔드포인트 이외에 생성 할 수 있는 create 엔드포인트를 만들어보자

간단하게 @Post() decorator 를 사용하면 된다.

```typescript
import { Controller, Get, Post, Req } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  createCat(): string {
    return 'create cat';
  }

  @Get()
  findAll(@Req() req: Request): string {
    return 'return all cats';
  }
}
```

즉, 표준 HTTP methods 를 decorator 로 제공한다.

**@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head()**

@All() 은 위 모두를 처리하는 엔드포인트를 정의한다.

#### Status Code

언급한대로 기본적으로 상태 코드는 POST 요청을 제외하고는 항상 200이다.

@HttpCode() decorator 를 통해 핸들러 레벨에서 쉽게 바꿀 수 있다.

```typescript
  @Put()
  @HttpCode(204)
  modifyCat(): string {
    return 'modify cat';
  }
```

> HttpCode 는 @nestjs/common 패키지에서 import 한다.

종종 상태 코드가 정적이 아니라 다양한 요인에 의해 달라질 수 있다. 

이 경우 library-specific response 객체를 사용할 수 있다. (`@Res()`)

#### Headers

custom response header 를 위해 `@Header()` decorator 나 library-specific response 객체를 사용 할 수 있다.

```typescript
@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
```

#### Redirection

응답을 특정 URL 로 리다이렉션 하려면 `@Redirect()` decorator 나 library-specific response 객체 (`res.redirect()`) 를 사용할 수 있다.

`@Redirect()` decorator 는 optional 한 2개의 arguments 를 가진다. - `url`, `statusCode`

statusCode 의 default 값은 302 이다.

```typescript
@Get()
@Redirect('https://nestjs.com', 301)
```

때때로 동적으로 statusCode 나 URL 을 결정해야 하는 경우가 있다.

```json
{
  "url": string,
  "statusCode": number
}
```

다음과 같은 형식으로 반환하여 수행할 수 있다.

```typescript
@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}
```

반환 값은 `@Redirect()` decorator 에 전달된 모든 인수를 재정의한다.

#### Route Parameters

매개변수가 있는 경로를 정의하기 위해 경로에 route parameter 토큰을 추가하여 동적 값을 찾아낼 수 있다.

```typescript
  @Get(':id')
  findCatById(@Param('id') id: string): string {
    console.log(id);
    return `return cat's id : ${id}`;
  }
```


