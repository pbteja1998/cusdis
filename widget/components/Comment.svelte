<script>
  import { getContext } from 'svelte'
  import { formatDate } from '../format-date'
  import { t } from '../i18n'

  import Reply from './Reply.svelte'
  export let comment
  export let showReplyForm = false
  export let isChild = false

  const { showIndicator } = getContext('attrs')

</script>

<div
  class="my-4 space-y-3"
  class:pl-4={isChild}
  class:border-l-2={isChild}
  class:border-color-gray-200={isChild}
  class:cusdis-indicator={showIndicator}
>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-3">
          <span class="inline-block h-6 w-6 overflow-hidden rounded-full bg-gray-100">
            <svg
              class="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <p class="text-base font-bold text-gray-900">
              {comment.moderator && comment.moderator.displayName ? comment.moderator.displayName : comment.by_nickname}
            </p>
          </span>
        </div>
        <p class="text-xs font-semibold uppercase tracking-widest text-gray-500 mt-0">
          {formatDate(comment.parsedCreatedAt)}
        </p>
        {#if comment.moderatorId}
          <span class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-gray-800">
            {t('mod_badge')}
          </span>
        {/if}
      </div>
    </div>
    <p class="text-base font-medium text-gray-900">
      {@html comment.parsedContent}
    </p>
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-3">
        <button 
          type="button" 
          class="inline-flex items-center rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
          on:click={(_) => {
            showReplyForm = !showReplyForm
          }}
        >
          <svg
            class="mr-2 h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.53033 5.46967C7.82322 5.76256 7.82322 6.23744 7.53033 6.53033L3.81066 10.25H15.6H15.633C16.7251 10.25 17.5906 10.25 18.2883 10.307C19.0017 10.3653 19.6053 10.4869 20.1565 10.7677C21.0502 11.2231 21.7769 11.9498 22.2323 12.8435C22.5131 13.3947 22.6347 13.9983 22.693 14.7117C22.75 15.4094 22.75 16.2748 22.75 17.367V17.4V17.5V18C22.75 18.4142 22.4142 18.75 22 18.75C21.5858 18.75 21.25 18.4142 21.25 18V17.5V17.4C21.25 16.2675 21.2494 15.4633 21.198 14.8339C21.1473 14.2133 21.0509 13.829 20.8958 13.5245C20.5842 12.913 20.087 12.4158 19.4755 12.1042C19.171 11.9491 18.7867 11.8527 18.1661 11.802C17.5367 11.7506 16.7325 11.75 15.6 11.75H3.81066L7.53033 15.4697C7.82322 15.7626 7.82322 16.2374 7.53033 16.5303C7.23744 16.8232 6.76256 16.8232 6.46967 16.5303L1.46967 11.5303C1.17678 11.2374 1.17678 10.7626 1.46967 10.4697L6.46967 5.46967C6.76256 5.17678 7.23744 5.17678 7.53033 5.46967Z"
            />
          </svg>
          {t('reply_btn')}
        </button>
      </div>
    </div>
</div>

<div class="space-y-10 pl-16">
  {#if comment.replies.data.length > 0}
    {#each comment.replies.data as child (child.id)}
      <svelte:self isChild={true} comment={child} />
    {/each}
  {/if}
</div>

{#if showReplyForm}
  <div class="mt-4 pl-4 border-l-2 border-gray-200">
    <Reply
      parentId={comment.id}
      onSuccess={() => {
        showReplyForm = false
      }}
    />
  </div>
{/if}

<!--

<div
  class="my-4"
  class:pl-4={isChild}
  class:border-l-2={isChild}
  class:border-color-gray-200={isChild}
  class:cusdis-indicator={showIndicator}
>
  <div class="flex items-center">
    <div class="mr-2 font-medium dark:text-gray-100">
      {comment.moderator && comment.moderator.displayName ? comment.moderator.displayName : comment.by_nickname}
    </div>

    {#if comment.moderatorId}
      <div class="mr-2 dark:bg-gray-500 bg-gray-200 text-xs py-0.5 px-1 rounded dark:text-gray-100">
        <span>{t('mod_badge')}</span>
      </div>
    {/if}
  </div>

  <div class="text-gray-500 text-sm dark:text-gray-400">
    {comment.parsedCreatedAt}
  </div>

  <div class="text-gray-500 my-2 dark:text-gray-200">
    {@html comment.parsedContent}
  </div>

  {#if comment.replies.data.length > 0}
    {#each comment.replies.data as child (child.id)}
      <svelte:self isChild={true} comment={child} />
    {/each}
  {/if}

  <div>
    <button
      class="font-medium text-sm text-gray-500 dark:bg-transparent dark:text-gray-100"
      type="button"
      on:click={(_) => {
        showReplyForm = !showReplyForm
      }}>{t('reply_btn')}</button
    >
  </div>


  {#if showReplyForm}
    <div class="mt-4 pl-4 border-l-2 border-gray-200">
      <Reply
        parentId={comment.id}
        onSuccess={() => {
          showReplyForm = false
        }}
      />
    </div>
  {/if}


</div>

-->
