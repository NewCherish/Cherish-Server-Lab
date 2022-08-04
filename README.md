# Cherish-Server-Lab
서현 🖤-> 정아 &lt;-🖤 지윤 Cherish 연습실

# Nest.js

## 목차

[Intro](#Intro)

[Installation](#Installation)

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

프로젝트가 만들어지고 yarn start 를 터미널에 입력하면, localhost:3000 에서 서버가 시작된다.

<img width="300" alt="image" src="https://user-images.githubusercontent.com/20807197/182793092-1350a6b8-39ae-43ad-ad49-95e68e7743a3.png">
