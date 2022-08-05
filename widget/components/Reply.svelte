<script>
  import { getContext } from 'svelte'
  import { t } from '../i18n'
  export let parentId

  // form data
  let content = ''
  let nickname = ''
  let email = ''

  let loading = false

  export let onSuccess

  const api = getContext('api')
  const setMessage = getContext('setMessage')
  const { appId, pageId, pageUrl, pageTitle } = getContext('attrs')
  const refresh = getContext('refresh')

  async function addComment() {
    if (!content) {
      alert(t('content_is_required'))
      return
    }

    if (!nickname) {
      alert(t('nickname_is_required'))
      return
    }

    try {
      loading = true
      const res = await api.post('/api/open/comments', {
        appId,
        pageId,
        content,
        nickname,
        email,
        parentId,
        pageUrl,
        pageTitle,
      })
      await refresh()
      teardown()
      setMessage(t('comment_has_been_sent'))
    } finally {
      loading = false
    }
  }

  function teardown() {
    content = ''
    nickname = ''
    email = ''
    onSuccess && onSuccess()
  }

</script>

<div class="flex items-start">
  <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
    <svg
      class="h-full w-full text-gray-300"
      fill="currentColor"
      view-box="0 0 24 24"
    >
      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  </span>
  <form class="ml-4 flex-1 space-y-4">
    <div class="flex space-x-2">
      <div class="flex-1">
        <div class="flex justify-between">
          <label for="nickname" class="text-sm font-semibold text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            {t('nickname')}
          </label>
        </div>
        <div class="mt-2">
          <input 
            type="text" 
            name="nickname"
            class="block w-full rounded-lg px-4 py-3 font-medium shadow-sm border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            title={t('nickname')}
            placeholder={t('nickname')}
            bind:value={nickname}
          />
        </div>
      </div>
      <div class="flex-1">
        <div class="flex justify-between">
          <label for="email" class="text-sm font-semibold text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
            {t('email')}
          </label>
        </div>
        <div class="mt-2">
          <input 
            type="email" 
            name="email"
            class="block w-full rounded-lg px-4 py-3 font-medium shadow-sm border-gray-300 focus:border-gray-900 focus:ring-gray-900"
            title={t('email')}
            placeholder={t('email')}
            bind:value={email}
          />
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-between">
        <label for="reply_content" class="text-sm font-semibold text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*']">
          {t('reply_placeholder')}
        </label>
      </div>
      <div class="mt-2">
        <textarea 
          title={t('reply_placeholder')} 
          placeholder={t('reply_placeholder')} 
          name="reply_content" 
          cols="30" 
          rows="3" 
          class="block w-full resize-y rounded-lg px-4 py-3 font-medium shadow-sm border-gray-300 focus:border-gray-900 focus:ring-gray-900 sm:text-sm" 
          bind:value={content} 
        />
      </div>
    </div>
    <div class="mt-3">
      <button 
        class="inline-flex items-center rounded-lg border border-transparent bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2" 
        class:cusdis-disabled={loading}
        on:click={addComment}
      >
        {loading ? t('sending') : t('post_comment')}
      </button>
    </div>
  </form>
</div>

<div class="grid grid-cols-1 gap-4">
  <div class="grid grid-cols-2 gap-4">
    <div class="px-1">
      <label class="mb-2 block dark:text-gray-200" for="nickname">{t('nickname')}</label>
      <input
        name="nickname"
        class="w-full p-2 border border-gray-200 bg-transparent dark:text-gray-100 dark:outline-none"
        type="text"
        title={t('nickname')}
        bind:value={nickname}
      />
    </div>
    <div class="px-1">
      <label class="mb-2 block dark:text-gray-200" for="email">{t('email')}</label>
      <input
        name="email"
        class="w-full p-2 border border-gray-200 bg-transparent  dark:text-gray-100 dark:outline-none"
        type="email"
        title={t('email')}
        bind:value={email}
      />
    </div>
  </div>

  <div class="px-1">
    <label class="mb-2 block dark:text-gray-200" for="reply_content">{t('reply_placeholder')}</label>
    <textarea
      name="reply_content"
      class="w-full p-2 border border-gray-200 h-24 bg-transparent dark:text-gray-100 dark:outline-none"
      title={t('reply_placeholder')}
      bind:value={content}
    />
  </div>

  <div class="px-1">
    <button

      class="text-sm bg-gray-200 p-2 px-4 font-bold"
      class:cusdis-disabled={loading}
      on:click={addComment}>{loading ? t('sending') : t('post_comment')}</button
    >
  </div>
</div>

<style>
  /* textarea,
  input {
    width: 100%;
    border: 2px solid;
    color: var(--cusdis--color-text-default);
    border-color: var(--cusdis--color-input-border);
    background: none;
    padding: 0.5em;
    border-radius: 4px;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;
    font-size: 1em;
  }

  textarea {
    height: 5em;
    outline: none;
  }

  .cusdis-disabled {
    background-color: var(--cusdis--color-btn-bg-disabled);
    cursor: not-allowed;
  }

  .cusdis-reply-info {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-column-gap: 0.5em;
  }

  @media only screen and (max-width: 767px) {
    .cusdis-reply-info {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      grid-row-gap: 0.5em;
    }
  }

  .submit-btn {
    background-color: var(--cusdis--color-btn-bg-default);
    color: var(--cusdis--color-btn-text);
    border-radius: 0;
    border: var(--cusdis--color-btn-border);
    padding: 0.5em 1em;
    cursor: pointer;
    border-radius: 2px;
    font-family: inherit;
    font-size: 1em;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    font: inherit;
    font-weight: bold;
    align-items: center;
  }

  .cusdis-field {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  } */

</style>
