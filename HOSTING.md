# 🌐 CASPER CTF 2026 호스팅 가이드

이 문서는 CASPER CTF 2026 웹 방탈출 게임을 호스팅하는 방법을 설명합니다.

## 방법 1: GitHub Pages (추천) 🚀

가장 간단하고 무료로 호스팅할 수 있는 방법입니다.

### 단계별 설정

1. **GitHub 저장소 설정**
   - 이미 GitHub 저장소에 있으므로 준비 완료!

2. **GitHub Pages 활성화**
   - GitHub 저장소 페이지로 이동
   - `Settings` → `Pages` 클릭
   - `Source`에서 `main` 브랜치 선택
   - `/ (root)` 폴더 선택
   - `Save` 클릭

3. **접속하기**
   - 몇 분 후 `https://typemnm.github.io/CASPER_CTF_2026/` 에서 접속 가능
   - 또는 Settings > Pages에 표시된 URL 확인

### 장점
- ✅ 완전 무료
- ✅ HTTPS 자동 제공
- ✅ 설정 간단
- ✅ 자동 배포 (push하면 자동 업데이트)

## 방법 2: Netlify 🎯

더 많은 기능이 필요한 경우 사용합니다.

### 설정 방법

1. [Netlify](https://www.netlify.com/) 가입
2. `New site from Git` 클릭
3. GitHub 저장소 연결
4. Build settings:
   - Build command: (비워두기)
   - Publish directory: `/`
5. `Deploy site` 클릭

### 장점
- ✅ 무료 (기본 플랜)
- ✅ 빠른 배포
- ✅ 커스텀 도메인 지원
- ✅ 자동 HTTPS

## 방법 3: Vercel ⚡

### 설정 방법

1. [Vercel](https://vercel.com/) 가입
2. `Import Project` 클릭
3. GitHub 저장소 연결
4. 자동으로 감지하고 배포

### 장점
- ✅ 무료 (취미 프로젝트)
- ✅ 매우 빠른 속도
- ✅ 자동 배포

## 방법 4: 로컬 테스트 🖥️

배포 전 로컬에서 테스트하려면:

### Python을 사용한 간단한 서버

```bash
# Python 3 설치 확인
python3 --version

# 프로젝트 디렉토리에서 실행
cd /path/to/CASPER_CTF_2026
python3 -m http.server 8000

# 브라우저에서 접속
# http://localhost:8000
```

### Node.js를 사용한 서버

```bash
# http-server 설치 (한 번만)
npm install -g http-server

# 프로젝트 디렉토리에서 실행
cd /path/to/CASPER_CTF_2026
http-server -p 8000

# 브라우저에서 접속
# http://localhost:8000
```

## 모바일 테스트 📱

이 게임은 모바일 최적화되어 있으므로 모바일에서 테스트하세요:

1. 같은 Wi-Fi 네트워크에 연결
2. 컴퓨터의 IP 주소 확인:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` 또는 `ip addr`
3. 모바일에서 `http://[컴퓨터IP]:8000` 접속

## 보안 고려사항 🔒

- 이 게임은 **교육 목적**의 CTF입니다
- 정답이 JavaScript 파일에 포함되어 있습니다
- 실제 보안 시스템으로 사용하지 마세요
- 참가자들에게 소스 코드를 보지 않도록 안내하세요

## 문제 해결 ⚙️

### GitHub Pages가 작동하지 않는 경우

1. 저장소가 Public인지 확인
2. index.html이 루트 디렉토리에 있는지 확인
3. Settings > Pages에서 상태 확인
4. 몇 분 기다린 후 다시 시도

### 모바일에서 레이아웃이 깨지는 경우

- 이미 반응형으로 디자인되어 있으므로 정상입니다
- 크롬/사파리 최신 버전 사용 권장

## 추천 설정 ⭐

**CASPER 동아리 MT용으로는 GitHub Pages를 추천합니다:**

1. 무료로 사용 가능
2. 설정이 매우 간단
3. 모든 참가자가 같은 URL로 접속 가능
4. 별도의 서버 관리 불필요

**배포 완료!** 🎉
