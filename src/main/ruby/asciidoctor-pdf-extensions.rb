require 'asciidoctor-pdf' unless defined? ::Asciidoctor::Pdf

module AsciidoctorPdfExtensions
  def layout_title_page doc
      # no title page
  end

  def layout_chapter_title node, title
    if node.id == "dedication" || node.id == "acknowledgements"
      # todo: Add underline of forward-slashes under title
      # todo: Add margin below title, before text
        layout_heading_custom title, align: :center
    elsif node.id.include? "mini-book" # colophon
      # todo: make title font-size same as text, align with bottom of page
      layout_heading title, margin: 5
    elsif node.id.include? "jhipster" #chapters
      puts node.id
      # todo: add 'Part One|Two|Three' to title and make font name, size and colors match InfoQ
      layout_heading title, align: :right, margin_top: 3
      start_new_page
    else
       # delegate to default implementation
       super
    end
  end

  def layout_heading_custom string, opts = {}
      top_margin = (margin = (opts.delete :margin)) || (opts.delete :margin_top) || @theme.heading_margin_top
      bot_margin = margin || (opts.delete :margin_bottom) || @theme.heading_margin_bottom
      puts 'top margin: ' + top_margin.to_s

      move_down (@theme.title_page_title_margin_top || 0)

      if (transform = (opts.delete :text_transform) || @text_transform)
          string = transform_text string, transform
      end
      margin_top top_margin
      typeset_text string, calc_line_metrics((opts.delete :line_height) || @theme.heading_line_height), {
          color: '002EB8', size: 40,
          inline_format: true,
          align: :left
      }.merge(opts)
      margin_bottom bot_margin
  end
end

Asciidoctor::Pdf::Converter.prepend AsciidoctorPdfExtensions
